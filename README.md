# Expérience de Développement - Test Technique Kolizeo

## 📝 Synthèse

Expérience globalement positive. L'utilisation d'un template de projet existant a permis un gain de
temps significatif sur le setup initial, permettant de se concentrer sur la logique métier.

## 🛠️ Choix Techniques

- **Next.js & Vercel** : Appréciés pour la fluidité du développement et la rapidité du déploiement.
- **shadcn/ui** : Choix personnel pour générer rapidement des composants UI modernes, accessibles et
  esthétiques, bien que non spécifié dans les contraintes initiales.

## ⚠️ Difficultés Rencontrées

La principale difficulté a résidé dans l'intégration avec **Unity Authentication** et **Remote
Config** :

- Documentation parfois complexe à naviguer pour ce cas d'usage spécifique.
- Manque de feedback explicite de l'API sur la validité de l'ID projet fourni, rendant le débogage
  initial laborieux (impossible de vérifier facilement si les informations sont correctes).
- La fiche de test étant parfois vague sur certains points, j'ai dû faire des choix d'implémentation
  basés sur les meilleures pratiques.

## ⏱️ Suivi du Temps

- **Temps estimé** : 2h15
- **Temps réel** : 2h47

Le dépassement est principalement dû à la complexité de l'intégration Unity (Auth + Remote Config)
qui a nécessité plus de recherche que prévu.

> Pour le détail complet du suivi : [AGILE – Suivi du Temps (Estimation vs Réalité)](AGILE.md)

## ✅ Conclusion

Globalement satisfait du résultat final. Le projet répond aux exigences fonctionnelles et fonctionne
correctement, avec une architecture propre et maintenable.
