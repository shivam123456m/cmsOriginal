import axios from "axios";
import React, { useEffect, useState, FormEvent} from "react";
import { Button, Col, Container, Form, Row, DropdownButton, Dropdown, Card } from 'react-bootstrap'
// import { Card, Dropdown, Container, Form, } from "react-bootstrap";
const data = [
    { heading: 'heading', paragraph:'paragraph', image:'image' },
]
export interface HeaderType {
    heading: string;
    idea: string;
    title: string;
}


const HeaderTwo = () => {

    const [headerData, setHeaderData] = useState<HeaderType[]>([]);
    const [image, setImage] = useState<null | string>(null);
    const [heading, setHeading] = useState<string>('');
    const [paragraph, setParagraph] = useState<string>('');


    // const getData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/get/header');
    //         const data = response.data;
    //         console.log('data------', data)
    //         setHeaderData(data)
    //     }
    //     catch (error) {
    //         console.error('error', error)
    //     }
    // }


    useEffect(() => {
        fetch('http://localhost:5000/get/header')
        .then(response =>response.json())
        .then(res => console.log('res-----', res))// resolve this response/ promise
    }, [])




    const editBanner = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        alert('clicked');
        const formData: FormData = new FormData();
        formData.append('heading', heading);
        formData.append('paragraph', paragraph);
        if(image){
            formData.append('image', image);
        }
        console.log(formData);
        try {
        //   await api.updatePatchData(`/update/header/64c9126d1b2b99a36068ede3`, formData);
        const response = await axios.post('http://localhost:5000/add/header',formData);

          setHeading("");
          setParagraph("");
          setImage(null);
        } catch (error) {
          console.error('Error during edit the banner:', error);
        }
      };



    return (
        <>
            <Card className="bg-primary">
                <Card.Body>
                    <h6 className="header-title mb-3">Hello</h6>
                    {(data || []).map((item, index) => {
                        return (
                            <div key={index} className="d-flex mt-1 border-top pt-2">
                                <div className="flex-grow-1">

                                    <h5 className="mt-1 mb-0 fs-15">{item.heading}</h5>
                                    <h5 className="mt-1 mb-0 fs-15">{item.paragraph}</h5>
                                    <h5 className="mt-1 mb-0 fs-15">{item.image}</h5>

                                    {/* <button onClick={() => getData()}>get data</button> */}
                                </div>
                            </div>
                        )
                    })}

                    <Container className='pt-1 shadow-lg mt-1 p-1 border border-2 border-light rounded d-flex' >
                        {/* <Row> */}
                        <Col md={6} className='container signup__form--container align-self-centerd-flex shadow-lg p-3 border border-2 border-muted mb-5 bg-white rounded d-flex accordion' id="accordionExample">
                            {/* onSubmit={editBanner} */}
                            <Form style={{ width: "100%" }} onSubmit={editBanner}>
                                <h1>Edit About us</h1>

                                {(data || []).map((item, i) => (
                                    <>
                                        <Form.Group>
                                            <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>Heading</h5></Form.Label>
                                            <Form.Control className="accordion-item" type='text' placeholder={item.heading} value={heading} onChange={(e)=>setHeading(e.target.value)}/>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className='d-flex  pt-2justify-content-start font-weight-bold'><h5>Paragraph</h5></Form.Label>
                                            <Form.Control type='text' placeholder={item.paragraph} value={paragraph} onChange={(e)=>setParagraph(e.target.value)} />{/* onChange={handleImageChange} */}
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className='d-flex pt-1 justify-content-start'><h5>Image</h5></Form.Label>
                                            {/* onChange={handleImageChange} */}
                                            <Form.Control type="file" id="image" name="image" accept="image/*"  />
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
                </Card.Body>
            </Card>



        </>
    )
}
export default HeaderTwo
