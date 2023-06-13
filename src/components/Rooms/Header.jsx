import React from 'react';
import Heading from '../Heading/Heading';

const Header = ({roomData}) => {
    return (
        <>
            <Heading
                    title={roomData.title}
                    subtitle={roomData.location}
                />
                <div className='w-full md:h-[80vh] overflow-hidden rounded-xl'>
                    <img className='object-cover w-full' src={roomData.image} alt="Image" />
                </div>
        </>
    );
};

export default Header;