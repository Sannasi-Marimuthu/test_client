import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ToastNotification from "./ToastNotification";

function UpdatePost({ id }) {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [show,setShow] = useState(false)
  const [isError,setIsError] = useState(false)
  const [message, setMessage] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please enter title");
      return;
    }
    if (!description) {
      alert("Please enter Description");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5500/api/updatepost/${params.postid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );
      console.log(response);
      if (response.ok) {
        setTitle("");
        setDescription("");
        setIsError(false)
        navigate("/",{state:{message:"Post updated Successfully"}});
      }else {
        const errResponse = await response.json()
        throw new Error(errResponse.message)
      }
    } catch (error) {
      setShow(true)
      setIsError(true)
      setMessage(error.message)
    } finally {
      setLoading(false);
     
    }
  };
  const getSinglePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5500/api/post/${params.postid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { post } = data;
      setTitle(post.title);
      setDescription(post.description);
    } catch (error) {}
  };

  useEffect(() => {
    getSinglePost();
  }, []);
  return (
   <>
     { show &&  <ToastNotification text={message} show={show} setShow={setShow} isError={isError}  />}
    <Container className="mt-5">
      <Row className="mt-3">
        <Col
          xs={{ span: 9, offset: 2 }}
          md={{ span: 8 }}
          lg={{ span: 6, offset: 3 }}
        >
          <h1 className="display-6 text-center mb-3">Update Post</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter Description"
                rows={3}
              />
            </Form.Group>
            <Button variant="dark" type="button">
              <Link to={"/"} className="text-decoration-none text-white">
                {" "}
                Cancel
              </Link>
            </Button>
           {!loading && <Button variant="warning" type="submit" className="mx-2">
              Update
            </Button>}
            {loading && <Button variant="primary" className="mx-2" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </Button>}
          </Form>
        </Col>
      </Row>
    </Container>
   </>
  );
}

export default UpdatePost;
