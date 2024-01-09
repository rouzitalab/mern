import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);

  const createSubmit = async (e) => {
    e.preventDefault();
    console.table([title, slug, stars, description]);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", category);
    // formData.append("thumbnail", thumbnail);
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });
      // const response = await fetch("http://localhost:8000/api/books", {
      //   method: "POST",
      //   headers: { 'content-type': 'application/json' },
      //   body: JSON.stringify({
      //     title: title,
      //     slug: slug,
      //     stars: stars,
      //     description: description,
      //     category: category,
      //   }),
      // });
      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    console.log("cat change handler");
    setCategory(e.target.value.split(",").map((category) => category.trim()));
    console.log(category);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Create Book</h1>
      {submitted ? (
        <p>Data Submitted Successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createSubmit}>
          {/* <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
            <input
            onChange={onImageChange}
            type="file" accept="image/gif, image/jpeg, image/png" />
          </div> */}
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Stars</label>
              <input
                type="number"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
            <div>
              <label>Category (comma-separated)</label>
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
            <input type="submit" value="+ Add Book" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBook;
