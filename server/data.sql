
INSERT INTO sites (site_name) VALUES ('Singapore');
INSERT INTO sites (site_name) VALUES ('Indonesia');

INSERT INTO plants (plant_name, site_id) VALUES ('PlantA', 1);
INSERT INTO plants (plant_name, site_id) VALUES ('PlantB', 1);
INSERT INTO plants (plant_name, site_id) VALUES ('PlantC', 2);
INSERT INTO plants (plant_name, site_id) VALUES ('PlantD', 2);

INSERT INTO departments (department_name, plant_id) VALUES ('Depart1', 1);
INSERT INTO departments (department_name, plant_id) VALUES ('Depart2', 3);

INSERT INTO workcenters (workcenter_name, department_id) VALUES ('WorkCentre1', 1);
INSERT INTO workcenters (workcenter_name, department_id) VALUES ('WorkCentre2', 1);
INSERT INTO workcenters (workcenter_name, department_id) VALUES ('WorkCentre3', 2);
INSERT INTO workcenters (workcenter_name, department_id) VALUES ('WorkCentre4', 2);

INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station1', 1);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station2', 1);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station3', 2);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station4', 2);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station5', 3);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station6', 3);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station7', 4);
INSERT INTO workstations (workstation_name, workcenter_id) VALUES ('Station8', 4);

INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (1, 'Asset1', '../Asset/Asset1.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (2, 'Asset2', '../Asset/Asset2.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (3, 'Asset3', '../Asset/Asset3.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (4, 'Asset4', '../Asset/Asset4.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (5, 'Asset5', '../Asset/Asset5.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (6, 'Asset6', '../Asset/Asset6.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (7, 'Asset7', '../Asset/Asset7.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (8, 'Asset8', '../Asset/Asset8.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (9, 'Asset9', '../Asset/Asset9.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (10, 'Asset10', '../Asset/Asset10.jpg', 1);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (11, 'Asset11', '../Asset/Asset11.jpg', 2);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (12, 'Asset12', '../Asset/Asset12.jpg', 2);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (13, 'Asset13', '../Asset/Asset13.jpg', 2);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (14, 'Asset14', '../Asset/Asset14.jpg', 2);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (15, 'Asset15', '../Asset/Asset15.jpg', 2);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (16, 'Asset16', '../Asset/Asset16.jpg', 3);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (17, 'Asset17', '../Asset/Asset17.jpg', 3);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (18, 'Asset18', '../Asset/Asset18.jpg', 3);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (19, 'Asset19', '../Asset/Asset19.jpg', 4);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (20, 'Asset20', '../Asset/Asset20.jpg', 5);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (21, 'Asset21', '../Asset/Asset21.jpg', 5);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (22, 'Asset22', '../Asset/Asset22.jpg', 5);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (23, 'Asset23', '../Asset/Asset23.jpg', 5);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (24, 'Asset24', '../Asset/Asset24.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (25, 'Asset25', '../Asset/Asset25.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (26, 'Asset26', '../Asset/Asset26.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (27, 'Asset27', '../Asset/Asset27.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (28, 'Asset28', '../Asset/Asset28.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (29, 'Asset29', '../Asset/Asset29.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (30, 'Asset30', '../Asset/Asset30.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (31, 'Asset31', '../Asset/Asset31.jpg', 6);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (32, 'Asset32', '../Asset/Asset32.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (33, 'Asset33', '../Asset/Asset33.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (34, 'Asset34', '../Asset/Asset34.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (35, 'Asset35', '../Asset/Asset35.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (36, 'Asset36', '../Asset/Asset36.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (37, 'Asset37', '../Asset/Asset37.jpg', 7);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (38, 'Asset38', '../Asset/Asset38.jpg', 8);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (39, 'Asset39', '../Asset/Asset39.jpg', 8);
INSERT INTO assets (asset_number, asset_name, image_path, workstation_id) VALUES (40, 'Asset40', '../Asset/Asset40.jpg', 8);