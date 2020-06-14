import "@elastic/eui/src/theme_light.scss";
import React from 'react';

import {
    EuiHeader,
    EuiHeaderBreadcrumbs,
    EuiHeaderSection,
    EuiFieldSearch,
    EuiFieldText,

    EuiHeaderSectionItem,
    EuiHeaderSectionItemButton,
    EuiHeaderLogo,
    EuiIcon,
} from '@elastic/eui';

// import HeaderAppMenu from './header_app_menu';
// import HeaderUserMenu from './header_user_menu';

export default class HeaderComponent extends React.Component {

    renderLogo = () => (

    );

    //
    // renderSearch = () => (
    //     <EuiHeaderSectionItemButton aria-label="Search">
    //         <EuiIcon type="search" size="m"/>
    //     </EuiHeaderSectionItemButton>
    // );

    render() {

        return (
            <EuiHeader>
                <EuiHeaderSection grow={false}>
                    <EuiHeaderSectionItem border="right">
                              <EuiHeaderLogo
            iconType="logoKibana"
            href="#"
            aria-label="Go to home page"
        />
                    </EuiHeaderSectionItem>
                    {/*<EuiHeaderSectionItem border="right">*/}
                    {/*  <HeaderSpacesMenu />*/}
                    {/*</EuiHeaderSectionItem>*/}
                </EuiHeaderSection>


                <EuiHeaderSection side="left" grow={true}>
                    <EuiHeaderSectionItem>
                        <EuiFieldSearch
                            fullWidth={true}
                            placeholder="Search the graph"
                            aria-label="Search the graph"
                            // compressed
                        />
                        <EuiHeaderSectionItemButton aria-label="Search">
                            <EuiIcon type="search" size="m"/>
                        </EuiHeaderSectionItemButton>

                    </EuiHeaderSectionItem>

                    {/*<EuiHeaderSectionItem>*/}
                    {/*  <HeaderUserMenu />*/}
                    {/*</EuiHeaderSectionItem>*/}

                    {/*<EuiHeaderSectionItem>*/}
                    {/*  <HeaderAppMenu />*/}
                    {/*</EuiHeaderSectionItem>*/}
                </EuiHeaderSection>
            </EuiHeader>
        );
    }

};