require 'rubygems'
require 'sinatra'

Sinatra::Application.default_options.merge!(
  :run => false,
  :raise_errors => true,
  :env => :production,
)

require 'commuteprice.rb'
run Sinatra.application