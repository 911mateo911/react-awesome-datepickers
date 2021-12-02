export const getClassNamesForThemeType = (className: string) => {
    const indexOfSeparation = className.indexOf('-');

    if (indexOfSeparation < 0 || className.indexOf('light') || className.indexOf('dark')) return className;

    const lightClassName = className.slice(0, indexOfSeparation).replace(/light:/, '');
    const darkClassName = className.slice(indexOfSeparation).replace(/- dark:/, '');

    return { lightClassName, darkClassName };
}

// stylesheet = document.styleSheets[0]
// stylesheet.insertRule(".have-border { border: 1px solid black;}", 0);

// TODO: come up with a way to handle dark modes

// export const mergeClassNames = (
//     nextButtonWrapperClassName: string,
//     prevButtonWrapperClassName: string,
//     wrapperClassName: string,
//     dayClassName: string,
//     selectedClassName: string,
//     disabledClassName: string,
//     notThisMonthClassName: string,
//     inRangeClassName: string,
//     inRangeHoverClassName: string,
//     lastInRangeClassName: string,
//     firstInRangeClassName: string,
// ) => {
//     return
// }
