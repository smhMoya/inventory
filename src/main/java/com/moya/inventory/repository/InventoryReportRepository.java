package com.moya.inventory.repository;

import com.moya.inventory.domain.InventoryReport;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;


/**
 * Spring Data JPA repository for the InventoryReport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventoryReportRepository extends JpaRepository<InventoryReport, Long> {

    Optional<InventoryReport> findBySteelPipeTypeEqualsAndThicknessEquals(String type, String thickness);
}
