# commuteprice.rb
require 'rubygems'
require 'sinatra'

get '/' do
  haml :index
end

post '/' do
  haml :index
end

get '/about' do
  haml :about
end

#get 'stylesheets/style.css' do
#  content_type 'text/css', :charset => 'utf-8'
#  sass :style
#end