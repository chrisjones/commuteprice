# commuteprice.rb
require 'rubygems'
require 'sinatra'

get '/' do
  haml :index
end

post '/calculate' do
  @origin, @dest, @mpg, @ppg = params[:origin], params[:dest], params[:mpg], params[:ppg]
  haml :index
end
