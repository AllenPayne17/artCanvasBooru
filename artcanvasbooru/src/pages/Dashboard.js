import React from "react";
import { useAppContext } from "../AppContex";

// layout
import Account from "../layout/Account";
import Posts from "../layout/Posts";
import Artist from "../layout/Artist";
import Menus from "../layout/Menus";
import Upload from "../layout/Upload";
import Randomly from "../layout/Randomly";
import About from "../element/About";
import Help from "../element/Help";
import Policy from "../element/Policy";

const componentsMap = {
    'link-1': <Account />,
    'link-2': <Posts />,
    'link-3': <Artist />,
    'link-4': <Upload />,
    'link-5': <Randomly />,
    'link-6': <About />,
    'link-7': <Help />,
    'link-8': <Policy />
};

function Dashboard() {
    const { selectedKey } = useAppContext();

    return (
        <div>
        <div className='logo-header'>
            <img src='https://res.cloudinary.com/dlsry4vmx/image/upload/v1702305840/arts/e0rem6dtizwc9tkcv1ds.png' style={{padding: '5px 0 5px 5px', height:'60px', width: 'auto'}} alt='artcanvasbooru' />
        </div>
        <Menus />
            {componentsMap[selectedKey] || null}
        </div>
    );
}

export default Dashboard;