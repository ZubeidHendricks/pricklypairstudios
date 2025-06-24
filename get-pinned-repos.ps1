# GitHub Pinned Repositories Fetcher
# Run this locally to get your pinned repositories

# Fetch pinned repositories
$pinnedRepos = gh repo list --source --private false --no-archived --limit 6 | 
    Where-Object { $_ -match 'pinned' } |
    ForEach-Object {
        $repoInfo = $_ -split '\s+'
        [PSCustomObject]@{
            Name = $repoInfo[0]
            Description = ($_ -replace $repoInfo[0], '') -replace 'pinned', '' -replace '^\s+', ''
        }
    }

# Display the repositories
$pinnedRepos | Format-Table -AutoSize
