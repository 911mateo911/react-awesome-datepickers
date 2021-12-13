import React, { FC, useEffect, memo } from 'react'
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
    wrapperClassName
}) => {
    const wrapperRef = useClickOutside<HTMLSpanElement>(onClose);

    useEffect(() => {
        document.querySelector(`#year_${(selectedDate?.getFullYear() || new Date().getFullYear())}`)?.scrollIntoView({ block: 'center' });
    }, [open]);

    return (
        <span
            ref={wrapperRef}
            className={classNames(
                styles['material-dropdown-wrapper'],
                wrapperClassName,
                {
                    [styles['material-dropdown-wrapper_closed']]: !open
                }
            )} >
            {getAllYears().map(year => <p
                key={year}
                id={`year_${year}`}
                className={classNames(
                    styles['material-dropdown-year'],
                    yearClassName,
                    {
                        [styles['material-dropdown-year_selected']]: selectedDate?.getFullYear() === year
                    }
                )}
                onClick={() => onYearClick(new Date(
                    year,
                    (selectedDate?.getMonth() ?? new Date().getMonth()),
                    (selectedDate?.getDate() ?? new Date().getDate())
                ))}
            >
                {year}
            </p>)
            }
        </span >
    )
})
