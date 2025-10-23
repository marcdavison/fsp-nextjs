
const animations = {
    pageLeftToRight: () => {
    document.documentElement.animate(
        [
            {
                transform: "translateX(0)",
            },
            {
                opacity: 0.2,
                transform: "translateX(-100%)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)"
        }
    );

    document.documentElement.animate(
        [
            {
                transform: "translateX(100%)",
            },
            {
                transform: "translateX(0px)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)"
        }
    );
},
pageRightToLeft: () => {
    document.documentElement.animate(
        [
            {
                transform: "translateX(0)",
            },
            {
                transform: "translateX(100%)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)"
        }
    );

    document.documentElement.animate(
        [
            {
                transform: "translateX(-100%)",
            },
            {
                transform: "translateX(0px)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)"
        }
    );
},
fadeOut: () => {
    document.documentElement.animate(
        [
            {
                opacity: "100%",
            },
            {
                opacity: "0%",
            },
        ],
        {
            duration: 300,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)"
        }
    );

    document.documentElement.animate(
        [
            {
                opacity: "0%",
            },
            {
                opacity: "100%",
            },
        ],
        {
            duration: 300,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)"
        }
    );
},
pageUp: () => {
    document.documentElement.animate(
        [
            {
                transform: "translateY(0)",
            },
            {
                transform: "translateY(0)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)"
        }
    );

    document.documentElement.animate(
        [
            {
                transform: "translateY(100%)",
            },
            {
                transform: "translateY(0px)",
            },
        ],
        {
            duration: 250,
            easing: "cubic-bezier(0.76, 0, 0.24, 1",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)"
        }
    );
}
};

export default animations;