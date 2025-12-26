import Details from "@/Components/button/Details";


const AssignedDetails = async ({ params }) => {
    
    const { id} = await params
    return (
        <div>
         
            <Details id={id}></Details>
        </div>
    );
};

export default AssignedDetails;