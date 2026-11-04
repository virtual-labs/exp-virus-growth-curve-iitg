document.addEventListener('DOMContentLoaded', () => {
    // 12-step Virus Growth Curve sequence configuration
    const steps = [
        {
            src: './images/Step1.mp4',
            caption: 'Step 1: Wash cells with PBS.'
        },
        {
            src: './images/Step2.mp4',
            caption: 'Step 2: Grow host cell culture (e.g., host bacteria) to the logarithmic growth phase.'
        },
        {
            src: './images/Step3.mp4',
            caption: 'Step 3: Inoculate cells with virus and incubate for 10 minutes to allow viral adsorption to surface receptors.'
        },
        {
            src: './images/Step4.mp4',
            caption: 'Step 4: Centrifuge the mixture to separate infected host cells from unadsorbed free viruses and discard the supernatant and resuspend the infected host cell pellet in fresh growth medium.'
        },
        {
            src: './images/Step5.mp4',
            caption: 'Step 5: Incubate the resuspended culture at the appropriate physiological replication temperature.'
        },
        {
            src: './images/Step6.mp4',
            caption: 'Step 6: Withdraw culture samples at regular, pre-defined time intervals (e.g., every 5-10 minutes).'
        },
        {
            src: './images/Step7.mp4',
            caption: 'Step 7: Perform plaque assay on the collected sample.'
        },
        {
            src: './images/Step8new.mp4',
            caption: 'Step 8: Use methanol to fix cells.'
        },
        {
            src: './images/Step9.mp4',
            caption: 'Step 9: Remove methanol and add crystal violet.'
        },
        {
            src: './images/Step10.mp4',
            caption: 'Step 10: Wash cells with water.'
        },
        {
            src: './images/Step11.mp4',
            caption: 'Step 11: Visualise the plaques.'
        },
        {
            src: './images/Step12.mp4',
            caption: 'Step 12: Virus growth curve.'
        }
    ];

    let currentIndex = 0;

    const sliderVideo = document.getElementById('sliderVideo');
    const slideCaption = document.getElementById('slideCaption');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepCounter = document.getElementById('stepCounter');
    const progressBar = document.getElementById('progressBar');
    const indicatorsContainer = document.getElementById('indicators');

    // Initialize dot indicators
    function initIndicators() {
        indicatorsContainer.innerHTML = '';
        steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => jumpToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    // Update the layout and slide content
    function updateSlide() {
        const step = steps[currentIndex];

        // Apply fade-out animation to the media element
        sliderVideo.classList.add('fade-out');

        setTimeout(() => {
            // Update source and load video
            sliderVideo.src = step.src;
            sliderVideo.load();

            // Wait for video data to load to prevent visual stutter
            sliderVideo.onloadeddata = () => {
                sliderVideo.classList.remove('fade-out');
                // Automatically play the video (muted)
                sliderVideo.play().catch(e => console.log('Playback prevented by browser policies:', e));
            };

            // Update caption content
            slideCaption.style.animation = 'none';
            slideCaption.offsetHeight; // trigger reflow
            slideCaption.style.animation = null;
            slideCaption.textContent = step.caption;

            // Update text counter and progress bar
            stepCounter.textContent = `Step ${currentIndex + 1} of ${steps.length}`;
            const progressPercentage = ((currentIndex + 1) / steps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Update dot indicators states
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Enable/disable navigation buttons
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === steps.length - 1;

        }, 250); // Matches the CSS transition duration
    }

    function goToNext() {
        if (currentIndex < steps.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    // Handle video end to automatically trigger next step
    sliderVideo.addEventListener('ended', () => {
        if (currentIndex < steps.length - 1) {
            goToNext();
        }
    });

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    function jumpToSlide(index) {
        if (index !== currentIndex && index >= 0 && index < steps.length) {
            currentIndex = index;
            updateSlide();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Initial setup
    initIndicators();
    updateSlide();
});
