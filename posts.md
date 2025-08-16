---
layout: page
title: "포스트"
permalink: /posts/
---

# 모든 포스트

{% if site.posts.size > 0 %}
<div class="posts-archive">
    {% for post in site.posts %}
        <article class="post-preview">
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <div class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">
                    {{ post.date | date: "%Y년 %m월 %d일" }}
                </time>
                {% if post.categories.size > 0 %}
                    <span class="categories">
                        {% for category in post.categories %}
                            <span class="category">{{ category }}</span>
                        {% endfor %}
                    </span>
                {% endif %}
            </div>
            {% if post.excerpt %}
                <div class="excerpt">
                    {{ post.excerpt | strip_html | truncatewords: 50 }}
                </div>
            {% endif %}
        </article>
    {% endfor %}
</div>
{% else %}
    <p>아직 포스트가 없습니다.</p>
{% endif %}

<style>
.posts-archive {
    margin-top: 2rem;
}

.post-preview {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
}

.post-preview:last-child {
    border-bottom: none;
}

.post-preview h2 {
    margin-bottom: 0.5rem;
}

.post-preview h2 a {
    color: #2c3e50;
    text-decoration: none;
}

.post-preview h2 a:hover {
    color: #3498db;
}

.excerpt {
    color: #666;
    margin-top: 1rem;
    line-height: 1.6;
}
</style>