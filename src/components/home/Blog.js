import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Blog() {
    const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://gauravjot-portfolio.firebaseio.com/blog.json')
      .then(({ data }) => {
        let postsArray = [];
        const postsInJSON = data.posts.split(',');
        postsInJSON.forEach(element => {
          postsArray[postsArray.length] = data[element];
        });
        setPosts(postsArray);
      });
  }, []);

    return (
        <div>
            <div className='heading b m-b-15 m-t-15'>
                <span className='b-accent-border'>Recent Articles</span>
            </div>

            <div className="row">
            {posts.map((post, index) => (
                <div className={(index > 1) ? "d-none d-lg-block d-xl-block col-sm-12 col-md-6 col-lg-4" : "col-sm-12 col-md-6 col-lg-4"}>
                    <div className="m-card m-card-hoverable">
                        {post.image &&
                            <img className="card-img-top" src={post.image} alt={post.title} />
                        }
                    <div className='media-body m-card-body d-inline-block'>
                        <div className="m-card-title"><a href={post.link}>{post.title} <i className="fa-solid fa-up-right-from-square"></i></a></div>
                        <div className="m-card-subtitle text-muted">{post.date} • {post.platform}</div>
                        <div className="p-1"></div>
                        <div className="m-card-description">{post.description.length > 160 ? post.description.replace(/^(.{100}[^\s]*).*/, "$1") + "…" : post.description}</div>
                        {/* <div className="p-2"></div>
                        <a className='btn btn-outline-light btn-sm float-right' href={post.link}>Read more</a> */}
                    </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
