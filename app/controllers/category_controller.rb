class CategoryController < ApplicationController
  def requestion
    @categories = Category.all
    render json: @categories, status: :ok
  end
end
