# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token
  before_action :configure_sign_in_params, only: [:create]

  include ActionController::MimeResponds

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super do |resource|
      puts "resource yielded: #{resource.to_s}"
      @resource = resource
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:user, keys: [:email, :password])
  end

    private

    def respond_with(resource, _opts = {})
      render json: resource
    end

    def respond_to_on_destroy
      head :no_content
    end
end
