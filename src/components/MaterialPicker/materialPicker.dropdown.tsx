import React, { FC, useEffect, memo, SyntheticEvent } from 'react'
import { MaterialYearDropdownProps } from './materialPicker.interface';
import styles from './dropdown.module.css';
import { getAllYears } from '../../utils';
import classNames from 'classnames';
import { useClickOutside } from '../../core/hooks/useClickOutside';

export const MaterialYearDropdown: FC<MaterialYearDropdownProps> = memo(({
    onYearClick,
    onClose,
    open,
    selectedDate,
    yearClassName,
    wrapperClassName,
    darkMode
}) => {
    const wrapperRef = useClickOutside<HTMLSpanElement>(onClose);

    useEffect(() => {
        document.querySelector(`#year_${(selectedDate?.getFullYear() || new Date().getFullYear())}`)?.scrollIntoView({ block: 'center' });
    }, [open]);

    const handleYearClick = (event: SyntheticEvent, year: number) => {
        event.stopPropagation();

        onClose();

        onYearClick(new Date(
            year,
            (selectedDate?.getMonth() ?? new Date().getMonth()),
            (selectedDate?.getDate() ?? new Date().getDate())
        ));
    }

    return (
        <span
            ref={wrapperRef}
            className={classNames(
                styles['material-dropdown-wrapper'],
                wrapperClassName,
                {
                    [styles['material-dropdown-wrapper_closed']]: !open,
                    [styles['material-dropdown-wrapper_light']]: !darkMode,
                    [styles['material-dropdown-wrapper_dark']]: darkMode
                }
            )} >
            {getAllYears().map(year => <p
                key={year}
                id={`year_${year}`}
                className={classNames(
                    styles['material-dropdown-year'],
                    yearClassName,
                    {
                        [styles['material-dropdown-year_selected__light']]: selectedDate?.getFullYear() === year && !Boolean(darkMode),
                        [styles['material-dropdown-year_selected__dark']]: selectedDate?.getFullYear() === year && Boolean(darkMode),
                        [styles['material-dropdown-year_light']]: !darkMode,
                        [styles['material-dropdown-year_dark']]: darkMode
                    }
                )}
                onClick={(event) => handleYearClick(event, year)}
            >
                {year}
            </p>)
            }
        </span >
    )
})
