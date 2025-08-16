source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.3.0"

# GitHub Pages 호환
gem "github-pages", group: :jekyll_plugins

# Jekyll 플러그인
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows와 JRuby에서는 tzinfo-data gem이 필요합니다
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows에서 파일 변경 감지를 위한 성능 부스터
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# JRuby를 사용하는 경우 HTTP_PARSER
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]