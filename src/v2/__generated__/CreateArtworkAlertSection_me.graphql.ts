/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LengthUnitPreference = "CM" | "IN" | "%future added value";
export type CreateArtworkAlertSection_me = {
    readonly lengthUnitPreference: LengthUnitPreference;
    readonly " $refType": "CreateArtworkAlertSection_me";
};
export type CreateArtworkAlertSection_me$data = CreateArtworkAlertSection_me;
export type CreateArtworkAlertSection_me$key = {
    readonly " $data"?: CreateArtworkAlertSection_me$data;
    readonly " $fragmentRefs": FragmentRefs<"CreateArtworkAlertSection_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateArtworkAlertSection_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lengthUnitPreference",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'd7f1842fbbcca3a5dd33c63ea49e2292';
export default node;
