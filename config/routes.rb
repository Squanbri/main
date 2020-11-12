Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'categories#categories'

  get 'skills'      => 'category#skills'
  get 'competencys' => 'category#competencys'
  post '/forms', to: 'forms#create'

  resources :category do
    resources :competencies do
      resources :skills
    end
  end
end
