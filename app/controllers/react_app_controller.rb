class ReactAppController < ApplicationController
  # GET /react_apps or /react_apps.json
  def index
    @react_apps = ReactApp.all
  end
end
