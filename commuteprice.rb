# commuteprice.rb
require 'rubygems'
require 'sinatra'

get '/' do
  haml :index
end

post '/' do
  @origin, @dest, @mpg, @ppg = params[:origin], params[:dest], params[:mpg], params[:ppg]
  haml :index
end

get '/about' do
  haml :about
end

post '/calculate' do
  @origin, @dest, @mpg, @ppg = params[:origin], params[:dest], params[:mpg], params[:ppg]
  haml :index
end
