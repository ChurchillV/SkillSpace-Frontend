import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { PageTitleProps } from '../../types';

const PageTitle:React.FC<PageTitleProps> = ({title}) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
    }, [location, title]);

    return null;
}

export default PageTitle;