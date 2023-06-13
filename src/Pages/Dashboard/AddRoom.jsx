import React, { useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { imageUpload } from '../../api/utils';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { set } from 'date-fns';
import { addRoom } from '../../api/rooms';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const [loading, setLoading] = useState(false);
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image');
    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const location  = form.location.value;
        const title  = form.title.value;
        const price  = form.price.value;
        const total_guest  = form.total_guest.value;
        const bedrooms  = form.bedrooms.value;
        const bathrooms  = form.bathrooms.value;
        const description  = form.description.value;
        const category  = form.category.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const image = form.image.files[0]
        setUploadButtonText('Uploading...')
        // ?Upload Image
        imageUpload(image)
        .then(data => {
            const roomData = {
                image: data.data.display_url,
                location,
                title,
                price,
                total_guest,
                bedrooms,
                bathrooms,
                description,
                category,
                from,
                to,
                host: {
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                }


            }

            // post roomData to server
            addRoom(roomData)
            .then(data => {
                if(data.insertedId){
                    setUploadButtonText('Uploaded');
                    setLoading(false)
                    toast.success('Successfully Added')
                    navigate('/dashboard/my-listings')
                }
            })
            .catch(err => console.log(err))
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message);
            setLoading(false)
        })
    }

    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }

    const handleDates = ranges => {
        setDates(ranges.selection);
    }
    return (
        <AddRoomForm 
        handleSubmit={handleSubmit} 
        loading={loading} 
        handleImageChange={handleImageChange} uploadButtonText={uploadButtonText} 
        dates={dates} 
        handleDates={handleDates}
        />
    );
};

export default AddRoom;