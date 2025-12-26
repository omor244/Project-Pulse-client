import Details from '@/Components/button/Details';
import React from 'react';

const ProjectDetails = async ({ params}) => {
    const { id } = await params;
    return (
        <div>
            <Details id={id}></Details>
        </div>
    );
};

export default ProjectDetails;