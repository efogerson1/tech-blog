const newBlogHandler = async (event) => {

	event.preventDefault();

	const title = document.querySelector('#blog-title').value.trim();
	const description = document.querySelector('#blog-desc').value.trim();

	if (title && description) {
		const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert("Blog creation failed.");
		}
	}
};


// allows for deletion of blog
const deletionHandler = async (event) => {

	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');
		const response = await fetch(`/api/blogs/${id}`, {
			method: 'DELETE',
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert("Blog deletion failed.");
		}
	}
};


const newBlogForm = document.querySelector(".new-blog-form");
newBlogForm.addEventListener('submit', newBlogHandler);


const blogList = document.querySelector(".blog-list");

if (blogList) {
	blogList.addEventListener('click', deletionHandler);
}