Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'categories#categories'

  get 'skills'       => 'categories#skills'
  get 'competencies' => 'categories#competencies'
  post '/forms', to: 'forms#create'

  resources :categories do
    resources :competencies do
      resources :skills
    end
  end
end
