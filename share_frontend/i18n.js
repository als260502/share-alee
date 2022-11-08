import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          Welcome: {
            text: "Welcome to this React Internationalization App",
          },
          Categories: {
            text: "Discover Categories",
          },
          AddingPins: {
            text: "We are adding new ideas to your feed!",
          },
          NoPins: {
            text: "No pins available!",
          },
          LoadingMessage: {
            text: "Loading...",
          },
          PinComments: {
            text: "Comments",
          },
          PinCommentAddPlaceholder: {
            text: "Add comments",
          },
          PinCommentAddButton: {
            firstText: "Add comment...",
            secondText: "Add",
          },
          PinFooterMsg: {
            text: "More..",
            textMore: "Loading more pins..",
          },
          SearchMsg: {
            text: "Memory pins not found!",
          },
          ProfileTextButton: {
            textCreated: "Created",
            textSaved: "Saved",
          },
          PinButton: {
            text: "Save",
          },
        },
      },
      fr: {
        translation: {
          Welcome: {
            text: "Bienvenue sur cette application d'internationalisation React",
          },
        },
      },
      pt: {
        translation: {
          Welcome: {
            text: "Bem vindo a essa App React com Internacionaliação",
          },
          Categories: {
            text: "Discover Categorias",
          },
          AddingPins: {
            text: "Estamos adicionando as memorias a sua dash",
          },
          NoPins: {
            text: "Não ha nenhuma memória",
          },
          LoadingMessage: {
            text: "Carregando...",
          },
          PinComments: {
            text: "Comentarios",
          },
          PinCommentAddPlaceholder: {
            text: "Adicione um comentario",
          },
          PinCommentAddButton: {
            firstText: "Adicionando comentário...",
            secondText: "Adicionado",
          },
          PinFooterMsg: {
            text: "Mais..",
            textMore: "Carregando mais memorias..",
          },
          SearchMsg: {
            text: "Nenhuma memory encontrada!",
          },
          ProfileTextButton: {
            textCreated: "Criadas",
            textSaved: "Guardadas",
          },
          PinButton: {
            text: "Guardar",
          },
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
