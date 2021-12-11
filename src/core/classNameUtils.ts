import classNames from 'classnames';

interface ThemeClassName {
    lightClass?: string,
    darkClass?: string
} // light:<class_here> - dark:<class_here>

const getClassNamesForThemeType = (className: string) => {
    const indexOfSeparation = className.indexOf('-');

    if (indexOfSeparation < 0) console.error(`Bad className format,
     it should be of type light:<class_here> - dark:<class_here>
     -- Instead found ${className}
     `)

    const lightClassName = className.slice(0, indexOfSeparation).replace(/light:/, '');
    const darkClassName = className.slice(indexOfSeparation).replace(/- dark:/, '');

    return { lightClass: lightClassName, darkClass: darkClassName } as ThemeClassName;
}

export const getThemeableClassNames = (
    isDarkMode: boolean,
    defaultLightClass: string,
    defaultDarkClass: string,
    userClassNames?: string
): string => {
    if (!userClassNames) return isDarkMode ? defaultDarkClass : defaultLightClass;

    const { lightClass: lightClassName, darkClass: darkClassName } = getClassNamesForThemeType(userClassNames)

    return isDarkMode ? classNames(defaultDarkClass, darkClassName) : classNames(defaultLightClass, lightClassName)
}
