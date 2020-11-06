class CategoryController < ApplicationController
  def categories
    @categories = Category.all
    render json: @categories, status: :ok
  end

  def competencys
    @competencys = Competency.all
    render json: @competencys, status: :ok
  end

  # def skills
  #   @skills = Skill.all
  #   render json: @skill, status: :ok
  # end

  def show
    @category = Category.find(params[:id])
  end
end
