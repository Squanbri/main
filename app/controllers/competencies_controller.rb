class CompetenciesController < ApplicationController
  def show
    @category = Category.find(params[:category_id])
    @competencies = @category.competencies
  end
end
