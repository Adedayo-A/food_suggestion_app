from flask import views, abort

from .recipe_finder import Recipe, recipes

from ..import api

@api.route("/recipe-finder/recipe/<uuid:recipe_id>")
class FoodRecipe(views.MethodView):
    @api.response(status_code = 200, schema = Recipe)
    def get(self, recipe_id):
        for recipe in recipes:
            if recipe["id"] == recipe_id:
                return recipe
        abort(404, f"Recipe with ID {recipe_id} not found")
