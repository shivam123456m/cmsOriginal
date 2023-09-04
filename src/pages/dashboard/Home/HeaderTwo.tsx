import axios from "axios";
import React, { useEffect, useState, FormEvent } from "react";
import { Button, Col, Container, Form, Row, DropdownButton, Dropdown, Card } from 'react-bootstrap'
// import { Card, Dropdown, Container, Form, } from "react-bootstrap";
const data = [
    { heading: 'heading', paragraph: 'paragraph', image: 'image' },
]
export interface HeaderType {
    _id: string;
    designation: string;
    profileName: string;
    slogan:string;
    state:string;
    image: string;
}


const HeaderTwo = () => {

    const [headerData, setHeaderData] = useState<HeaderType[]>([]);
    const [designation, setDesignation] = useState<string>('');
    const [profileName, setProfileName] = useState<string>('');
    const [slogan, setSlogan] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [image, setImage] = useState<null | string>(null);


    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get/header');
            const data = response.data;
            console.log('data------', data)
            setHeaderData(data)
            console.log('headerData------', headerData)
        }
        catch (error) {
            console.error('error', error)
        }
    }

    // useEffect(()=>{
    //      axios.get('http://localhost:5000/get/header')
    //     .then((response)=>{
    //         	console.log('data ---------  ', response.data)
    //     })
    //     .catch((err)=>{
    //         alert(err)
    //     })
    // },[])


    useEffect(() => {
        fetch('http://localhost:5000/get/header')
            .then(response => response.json())
            .then(res => setHeaderData(res))// resolve this response/ promise
    }, [])

    console.log('headerData---', headerData)

    // ---------------------------------------------with fetch----------
    const editBanner = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('clicked');

        const formData = new FormData();
        formData.append('designation', designation);
        formData.append('profileName', profileName);
        formData.append('slogan', slogan);
        formData.append('state', state);
        if (image) {
            formData.append('image', image);
        }
        console.log(formData);

        try {
            const response = await fetch(`http://localhost:5000/update/header/64f327a71996af67d9c57391`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Assuming you want to parse the JSON response
            const data = await response.json();

            setDesignation('');
            setProfileName('');
            setSlogan('')
            setState('')
            setImage(null);
        } catch (error) {
            console.error('Error during edit the banner:', error);
        }
    };

    // -----------------------------------------with axios --------------------------------------

    // const editBanner = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    //     event.preventDefault();
    //     alert('clicked');
    //     const formData: FormData = new FormData();
    //     formData.append('heading', heading);
    //     formData.append('paragraph', paragraph);
    //     if(image){
    //         formData.append('image', image);
    //     }
    //     console.log(formData);
    //     try {
    //     //   await api.updatePatchData(`/update/header/64c9126d1b2b99a36068ede3`, formData);
    //     const response = await axios.post('http://localhost:5000/add/header',formData);

    //       setHeading("");
    //       setParagraph("");
    //       setImage(null);
    //     } catch (error) {
    //       console.error('Error during edit the banner:', error);
    //     }
    //   };



    return (
        <>
            <Container className='pt-1 shadow-lg mt-1 p-1 border border-2 border-light rounded d-flex' >
                {/* <Row> */}
                <Col md={6} className='container signup__form--container align-self-centerd-flex shadow-lg p-3 border border-2 border-muted mb-5 bg-white rounded d-flex accordion' id="accordionExample">
                    {/* onSubmit={editBanner} */}
                    <Form style={{ width: "100%" }} onSubmit={editBanner}>

                        <h1>Header</h1>

                        {(headerData || []).map((item, i) => (
                            <>
                                <Form.Group>
                                    <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>Designation</h5></Form.Label>
                                    <Form.Control className="accordion-item" type='text' placeholder={item.designation} value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>Profile Name</h5></Form.Label>
                                    <Form.Control type='text' placeholder={item.profileName} value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>Slogan</h5></Form.Label>
                                    <Form.Control type='text' placeholder={item.slogan} value={slogan} onChange={(e) => setSlogan(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>State</h5></Form.Label>
                                    <Form.Control type='text' placeholder={item.state} value={state} onChange={(e) => setState(e.target.value)} />
                                </Form.Group>



                                <Form.Group>
                                    <Form.Label className='d-flex pt-1 justify-content-start'><h5>Image</h5></Form.Label>
                                    {/* onChange={handleImageChange} */}
                                    <Form.Control type="file" id="image" name="image" accept="image/*" />
                                </Form.Group>


                                <Form.Group className='pt-5 pb-5'>
                                    <Button type='submit'>Edit Banner</Button>
                                </Form.Group>
                            </>
                        ))}
                    </Form>
                    {/* <Button type='submit' onClick={handleFetchData}>handle fetch</Button> */}

                </Col>

            </Container>




        </>
    )
}
export default HeaderTwo
