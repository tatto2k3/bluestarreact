import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { SearchProvider } from '../src/Components/CustomHooks/SearchContext';
import { LanguageProvider } from '../src/Components/Utils/LanguageContext';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <LanguageProvider>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const Layout = route.layout;
                        const Page = route.element;
                        return <Route key={index}
                            element={

                                <SearchProvider>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </SearchProvider>

                            }
                            path={route.path} />;
                    })}
                </Routes>
            </LanguageProvider>
        );
    }
}