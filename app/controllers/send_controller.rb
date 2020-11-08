class SendController < ApplicationController
  def create
    @skills =

    @skills = Skill.all
    render json: @skills, status: :ok
  end
end
