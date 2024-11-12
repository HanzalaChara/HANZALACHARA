import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function editblog() {
  const navigate = useNavigate();
  const [blogName, setBlogName] = useState("Irtiza Blog");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]); // State for multiple blogs

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { blogName, content };

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }

      setBlogs([...blogs, newBlog]); // Add the new blog to the array
      setBlogName('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Add Blog</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type='text' 
          placeholder="Add Name"
          onChange={(e) => setBlogName(e.target.value)}
          value={blogName}
          style={styles.input}
        />
        <textarea
          placeholder='Add Blog'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          style={styles.textarea}
        />
        <button type='submit' style={styles.button}>Submit</button>
      </form>

      <div style={styles.blogList}>
        <h2>Blog Posts</h2>
        {blogs.map((blog, index) => (
          <div key={index} style={styles.blogItem}>
            <h3 style={styles.blogTitle}>{blog.blogName}</h3>
            <p style={styles.blogContent}>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles for better visuals
const styles = {
  container: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
}
 
  form: {
    display: 'flex',
    flexDir

  }
