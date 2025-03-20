export const fadeIn = (
    direction: "up" | "down" | "left" | "right",
    type: "spring" | "tween",
    delay: number,
    duration: number,
  ) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type,
          delay,
          duration,
          ease: "easeOut",
        },
      },
    }
  }
  
  export const staggerContainer = (staggerChildren: number, delayChildren: number) => {
    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren,
          delayChildren,
        },
      },
    }
  }
  
  export const slideIn = (
    direction: "up" | "down" | "left" | "right",
    type: "spring" | "tween",
    delay: number,
    duration: number,
  ) => {
    return {
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
      },
      visible: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: "easeOut",
        },
      },
    }
  }
  
  export const textVariant = (delay: number) => {
    return {
      hidden: {
        y: 50,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.25,
          delay,
        },
      },
    }
  }
  
  export const zoomIn = (delay: number, duration: number) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay,
          duration,
          ease: "easeOut",
        },
      },
    }
  }
  
  