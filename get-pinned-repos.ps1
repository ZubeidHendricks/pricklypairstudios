# GitHub Pinned Repositories Fetcher
# Requires GitHub CLI (gh) to be installed and authenticated

# Function to get pinned repositories
function Get-GitHubPinnedRepos {
    # Fetch pinned repositories
    $pinnedRepos = gh repo list --source --private false --no-archived --limit 10 | 
        Where-Object { $_ -match 'pinned' } |
        ForEach-Object {
            $repoInfo = $_ -split '\s+'
            [PSCustomObject]@{
                Name = $repoInfo[0]
                Description = ($_ -replace $repoInfo[0], '') -replace 'pinned', '' -replace '^\s+', ''
            }
        }
    
    # Add star count for each repository
    $pinnedRepos | ForEach-Object {
        $starCount = gh repo view $_.Name --json stargazerCount -q .stargazerCount
        $_ | Add-Member -NotePropertyName Stars -NotePropertyValue $starCount
    }

    return $pinnedRepos
}

# Display the pinned repositories
$pinnedRepos = Get-GitHubPinnedRepos
$pinnedRepos | Format-Table -AutoSize

# Export to JSON for website integration
$pinnedRepos | ConvertTo-Json | Out-File -FilePath "pinned_repos.json"
