import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState("")
  const [preview, setPreview] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

// useEffect hooks
  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async() => {
    const response = await axios.get(`http://localhost:5000/product/${id}`)
    setTitle(response.data.name)
    setFile(response.data.image)
    setPreview(response.data.url)
  }

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const procesUpdateProduct = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    try {
        await axios.patch(`http://localhost:5000/product/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        navigate("/")
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={procesUpdateProduct}>
                <div className="field">
                    <label className="label">Product Name</label>
                    <div className="control">
                        <input 
                            type="text" 
                            className="input" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Product Name'
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="file is-boxed">
                        <label className="file-label">
                            <input 
                                className="file-input"
                                type="file" 
                                onChange={loadImage} 
                            />
                            <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose a file…
                            </span>
                            </span>
                        </label>
                    </div>
                </div>

                {/* set Preview */}
                { preview ? (
                    <figure className='image is-128x128'>
                        <img src={preview} alt="Preview Image" />
                    </figure>
                ) : (
                    ""
                ) }

                <div className="field">
                    <div className="control">
                        <button type='submit' className="button is-success">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateProduct