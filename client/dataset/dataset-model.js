import {
  apply,
  applyEach,
  decimal,
  email,
  provided,
  temporal,
  url,
} from "../app-service/validators";
import {includesHvd} from "./edit/codelists/legislation";

export const SPATIAL_RUIAN = "RUIAN";

export const SPATIAL_CONTINENT = "CONTINENT";

export const SPATIAL_COUNTRY = "COUNTRY";

export const SPATIAL_PLACE = "PLACE";

export const SPATIAL_URL = "URL";

/**
 * New dataset entry for NKOD, no URL is provided.
 */
export const EXPORT_NKOD = "nkod";

/**
 * Edit of existing dataset.
 */
export const EXPORT_EDIT = "edit";

/**
 * New dataset for LKOD with custom URL not provided
 * in the URL.
 */
export const EXPORT_LKOD = "lkod";

export function createDataset() {
  return decorateDataset({
    "iri": undefined,
    "title_cs": "",
    "title_en": "",
    "description_cs": "",
    "description_en": "",
    "accrual_periodicity":
      "http://publications.europa.eu/resource/authority/frequency/MONTHLY",
    "spatial": [],
    "temporal_start": "",
    "temporal_end": "",
    "temporal_resolution": "",
    "spatial_resolution_meters": "",
    "documentation": "",
    "dataset_themes": [],
    "legislation": [],
    "dataset_custom_themes": [],
    "themes": [],
    "ofn": [],
    "contact_point_name": "",
    "contact_point_email": "",
    "keywords_cs": [],
    "keywords_en": [],
    "url_to_load_from": "",
    "ruian": "",
    "ruian_type": "",
    "publisher": undefined,
    "hvd_categories": [],
  });
}

export function decorateDataset(dataset) {
  return {
    ...dataset,
    "$validators": {
      "force": false,
      "forceHvd": false,
    },
  };
}

export function createDatasetValidators() {
  return {
    "err_title_cs": apply(
      (t) => t.dataset, "title_cs",
      provided,
      "dataset_title_invalid"),
    "err_description_cs": apply(
      (t) => t.dataset, "description_cs",
      provided,
      "dataset_description_invalid"),
    "err_dataset_spatial": apply(
      (t) => t.dataset, "spatial",
      provided,
      "dataset_spatial_invalid"),
    "err_keywords_cs": apply(
      (t) => t.dataset, "keywords_cs",
      provided,
      "keywords_error"),
    "err_contact_point_email": apply(
      (t) => t.dataset, "contact_point_email",
      email,
      "contact_point_email_invalid"),
    "err_documentation": apply(
      (t) => t.dataset, "documentation",
      url,
      "documentation_invalid"),
    "err_dataset_theme": apply(
      (t) => t.dataset, "dataset_themes",
      provided,
      "dataset_theme_invalid"),
    "err_dataset_theme_custom": applyEach(
      (t) => t.dataset, "dataset_custom_themes",
      url, "dataset_theme_invalid_url"),
    "err_dataset_ofn": applyEach(
      (t) => t.dataset, "ofn",
      url,
      "dataset_ofn_invalid_url"
    ),
    "err_temporal": apply(
      (t) => t.dataset, "temporal_resolution",
      temporal,
      "temporal_invalid"),
    "err_spatial": apply(
      (t) => t.dataset, "spatial_resolution_meters",
      decimal,
      "spatial_invalid"),
    "err_url_load": apply(
      (t) => t.dataset, "url_to_load_from",
      url, "load_invalid_url"
    ),
    "err_legislation": function () {
      // We validate HDF only when datasets and distributions are valid.
      // Here we use `validation` object directly, we are not using it
      // anywhere else as it was not originally passed around.
      const shouldSkipValidation =
        shouldSkipDatasetValidation(this.dataset)
        || !this.dataset.$validators.forceHvd;
      if (shouldSkipValidation) {
        return [];
      }
      const {dataset, distributions} = this;
      if (!includesHvd(dataset.legislation)) {
        return [];
      }
      for (const distribution of distributions) {
        if (includesHvd(distribution.legislation)) {
          return [];
        }
      }
      return [this.$t("missing_distribution_with_hvd")];
    },
    "err_hvd_categories": function () {
      if (shouldSkipDatasetValidation(this.dataset)) {
        return [];
      }
      const {dataset} = this;
      if (includesHvd(dataset.legislation)
        && dataset.hvd_categories.length === 0) {
        return [this.$t("missing_hvd_categories")];
      }
      return [];
    },
  };
}

/**
 * Return true when validation is forced, this happens when we navigate
 * from dataset to distribution detail. In other words we do not validate
 * until user fills in the form.
 *
 * Similar functionality is implemented by shouldValidate function
 * in validators.js file.
 */
function shouldSkipDatasetValidation(dataset) {
  return !dataset.$validators.force;
}

const validators = createDatasetValidators();

export function isDatasetValid(dataset, distributions) {
  // We need to mock the UI entity, to provide all
  // functions the validators need.
  const wrappedDistribution = {
    "dataset": dataset,
    "distributions": distributions,
    "$t": (message) => message,
  };
  for (let validator of Object.values(validators)) {
    const errorMessages = validator.call(wrappedDistribution);
    if (errorMessages.length > 0) {
      return false;
    }
  }
  return true;
}
