class CompetenciesController < ApplicationController
  def show
    @competency = Competency.find(params[:id])
  end

  def create
    @category = Category.find(params[:category_id])
    @competency = @category.competencies.create(competency_params)
    redirect_to category_path(@category)
  end

  private def competency_params
    params.require(:competency).permit(:title)
  end
end
