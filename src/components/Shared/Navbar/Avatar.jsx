import { useContext } from 'react';
import avatar from '../../../assets/images/placeholder.jpg';
import { AuthContext } from '../../../providers/AuthProvider';

const Avatar = () => {
    const {user} = useContext(AuthContext);

    return <img referrerPolicy='no-referrer' className='rounded-full' src={user && user.photoURL ? user.photoURL : avatar} alt="Profile Picture" width='30' height='30'/>
};

export default Avatar;