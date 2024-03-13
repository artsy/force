/**
 * @generated SignedSource<<757f37e7081fecc864576f605b91f597>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertsArtworks_alert$data = {
  readonly acquireable: boolean | null | undefined;
  readonly additionalGeneIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly artistSeriesIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly atAuction: boolean | null | undefined;
  readonly attributionClass: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly colors: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly dimensionRange: string | null | undefined;
  readonly height: string | null | undefined;
  readonly inquireableOnly: boolean | null | undefined;
  readonly internalID: string;
  readonly locationCities: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly majorPeriods: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly materialsTerms: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly offerable: boolean | null | undefined;
  readonly partnerIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly priceRange: string | null | undefined;
  readonly sizes: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly width: string | null | undefined;
  readonly " $fragmentType": "SavedSearchAlertsArtworks_alert";
};
export type SavedSearchAlertsArtworks_alert$key = {
  readonly " $data"?: SavedSearchAlertsArtworks_alert$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertsArtworks_alert">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertsArtworks_alert",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "acquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "additionalGeneIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistSeriesIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "atAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "attributionClass",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "colors",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dimensionRange",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sizes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "inquireableOnly",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationCities",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "majorPeriods",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "materialsTerms",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "offerable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerIDs",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceRange",
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};

(node as any).hash = "3364fbb812927ee29b96881e0463ab7e";

export default node;
