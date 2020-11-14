class SkillsController < ApplicationController
  # before_action :set_skill, only: %i[show create edit update destroy] # ligaturi %i %w i t.d.
  #
  # def index
  #   @skills = Skill.all
  # end
  #
  def show
    @competency = Competency.find(params[:competency_id])
    @category = @competency.category
    @skills = @competency.skills
    @skill = Skill.new
  end

  def create
    @competency = Competency.find(params[:competency_id])
    @skill = @competency.skills.create(skill_params)

    if @skill.save
      redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
    else
      render category_path
    end
  end

  def destroy
    # @skill = Skill.find(params[:id])
    @skill = Skill.find(params[:competency_id && :category_id && :id])
    @skill.destroy
    redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
  end

  def edit
    @skill = Skill.find(params[:id])
    @competency = @skill.competency
    @category = @competency.category
  end

  def update
    @skill = Skill.find(params[:id])
    if @skill.update_attributes(skill_params)
      redirect_to category_competency_skill_path(@skill.competency.category, @skill.competency, @skill)
    end
  end

  # def edit
    # @skill = Skill.find(params[:id])
  # end
  # def update
  #   # @skill = Skill.find(params[:id]) # dublirovanie gde?
  #   if @skill.update_attributes(skill_params)
  #     render :index
  #   end
  # end
  #
  # def destroy
  #   # @skill = Skill.find(params[:competency_id && :category_id && :id])
  #   @skill.destroy
  #   render :index
  # end
  #
  # private
  # def skill_params
  #   # params.permit(:title, :competency_id)
  #   params.require(:skill).permit(:title)
  # end
  #
  # def set_skill
  #   @skill = Skill.find(params[:id])
  #   # @category = Category.find(params[:competency_id])
  #   # @competency = Competency.find(params[:competency_id && :category_id])
  #   # @skills = Skill.all
  # end

  # Stoi eto edinstvennoe shto rabotaet)
  # def create
  #   @skill = Skill.new(skill_params)
  #   if @skill.save
  #     render :index
  #   end
  # end
  #
  # def destroy
  #   @skill = Skill.find(params[:competency_id && :category_id && :id])
  #   @skill.destroy
  #   render :index
  # end


  private

  def skill_params
    params.require(:skill).permit(:title)
  end
end

