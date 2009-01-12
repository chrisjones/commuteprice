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