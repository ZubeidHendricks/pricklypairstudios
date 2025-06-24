// Floating Calendly Widget
(function() {
    // Create floating booking button
    function createFloatingButton() {
        const button = document.createElement('div');
        button.id = 'floating-calendly-btn';
        button.innerHTML = `
            <div class="floating-btn-content">
                <span class="btn-text">📅 Book Free Call</span>
                <span class="btn-pulse"></span>
            </div>
        `;
        
        // Add styles
        const styles = `
            #floating-calendly-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
            }
            
            .floating-btn-content {
                background: linear-gradient(135deg, #00D4FF, #0099CC);
                color: #0A0A0A;
                padding: 15px 20px;
                border-radius: 50px;
                font-weight: bold;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
                position: relative;
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .floating-btn-content:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(0, 212, 255, 0.6);
            }
            
            .btn-pulse {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50px;
                background: rgba(255, 255, 255, 0.3);
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                70% { transform: scale(1.05); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @media (max-width: 768px) {
                #floating-calendly-btn {
                    bottom: 15px;
                    right: 15px;
                }
                
                .floating-btn-content {
                    padding: 12px 16px;
                    font-size: 13px;
                }
                
                .btn-text {
                    display: block;
                }
            }
        `;
        
        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Add click handler
        button.addEventListener('click', function() {
            if (typeof Calendly !== 'undefined') {
                Calendly.initPopupWidget({
                    url: 'https://calendly.com/zubeid-hendricks/ai-strategy-consultation'
                });
            } else {
                // Fallback to consultation page
                window.location.href = 'free-consultation.html';
            }
        });
        
        document.body.appendChild(button);
    }
    
    // Show button after page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createFloatingButton);
    } else {
        createFloatingButton();
    }
    
    // Hide button on consultation page
    if (window.location.pathname.includes('free-consultation.html')) {
        return;
    }
})();