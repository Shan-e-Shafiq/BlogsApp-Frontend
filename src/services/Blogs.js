import { getNewAccessToken } from "../utils"

export async function getAllBlogs(page, limit) {
    const response = await fetch(`/api/blogs/all?page=${page}&limit=${limit}`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function getBlogsPublisherID(publisherId, page, limit) {
    const response = await fetch(`/api/blogs/publisher?publisherId=${publisherId}&page=${page}&limit=${limit}`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}


export async function getBlogById(blogId) {
    const response = await fetch(`/api/blogs/view-blog/${blogId}`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function getBlogComments(blogId, page) {
    const response = await fetch(`/api/blogs/blog-data/comments?id=${blogId}&page=${page}`)
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function getlikedBlogs(likedBlogs) {
    const response = await fetch(`/api/blogs/liked-blogs`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likedBlogs })
    })
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function addNewBlog(params) {
    const { newBlog, publisher, token } = params
    const response = await fetch(`/api/blogs/post-blog/new`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...newBlog, publisher })
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function editBlog(params) {
    const { editedData, blogId, token } = params
    const response = await fetch(`/api/blogs/edit-blog/${blogId}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}


export async function deleteBlog(params) {
    const { blogId, token } = params
    const response = await fetch(`/api/blogs/delete-blog/${blogId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}


export async function likeBlog(params) {
    const { blogId, token } = params
    const response = await fetch(`/api/blogs/like-blog/${blogId}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}

export async function unlikeBlog(params) {
    const { blogId, token } = params
    const response = await fetch(`/api/blogs/unlike-blog/${blogId}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}


export async function postComment(params) {
    const { comment, blogId, token } = params
    const response = await fetch(`/api/blogs/post-comment/${blogId}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (response.status === 400 || response.status === 401) {
        return await getNewAccessToken(params, addNewBlog)
    }
    const data = await response.json()
    return {
        status: response.status,
        data: data
    }
}
