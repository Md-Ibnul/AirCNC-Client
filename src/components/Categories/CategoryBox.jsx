import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';

const CategoryBox = ({label, icon:Icon, selected}) => {
    const [params, setParams] = useSearchParams();
    const value = params.get('category');
    const navigate = useNavigate();

    // search by category
    const handleSearch = () => {
        let currentQuery = {};
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = {
            ...currentQuery, category: label
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true}
        )

        navigate(url);
    }
    return (
        <div onClick={handleSearch} className={`flex flex-col items-center justify-center gap-2 p-3 cursor-pointer border-b-2 hover:text-neutral-800 border-transparent text-neutral-500 ${
            selected
              ? 'border-b-neutral-800 text-neutral-800'
              : 'border-transparent text-neutral-500'
          }
       
        `}>
            <Icon size='26'/>
            <div className='text-sm font-medium'>{label}</div>
        </div>
    );
};

export default CategoryBox;