require 'rubygems'
require 'sinatra'

Sinatra::Application.default_options.merge!(
  :run => false,
  :environment => :production
)

require 'commuteprice.rb'
run Sinatra::Application
